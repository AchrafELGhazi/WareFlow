CREATE OR REPLACE FUNCTION process_client_order(
    p_client_order_id UUID,
    p_staff_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
    item_record RECORD;
    current_stock INTEGER;
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM client_orders
        WHERE client_order_id = p_client_order_id AND status = 'pending'
    ) THEN
        RAISE EXCEPTION 'Order not found or not in pending status';
        RETURN FALSE;
    END IF;

    FOR item_record IN
        SELECT coi.product_id, coi.quantity, p.warehouse_id
        FROM client_order_items coi
        JOIN products p ON coi.product_id = p.product_id
        WHERE coi.client_order_id = p_client_order_id
    LOOP
        SELECT COALESCE(SUM(CASE
            WHEN transaction_type = 'receive' THEN quantity
            WHEN transaction_type = 'ship' THEN -quantity
            WHEN transaction_type = 'adjust' THEN quantity
            ELSE 0
        END), 0) INTO current_stock
        FROM inventory_transactions
        WHERE product_id = item_record.product_id;

        IF current_stock < item_record.quantity THEN
            RAISE EXCEPTION 'Insufficient stock for product %', item_record.product_id;
            RETURN FALSE;
        END IF;

        PERFORM create_inventory_transaction(
            item_record.product_id,
            item_record.warehouse_id,
            p_staff_id,
            'ship',
            item_record.quantity
        );
    END LOOP;

    UPDATE client_orders
    SET status = 'processed'
    WHERE client_order_id = p_client_order_id;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;