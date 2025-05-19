CREATE OR REPLACE FUNCTION check_product_quantity()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.quantity < 10 THEN
        RAISE EXCEPTION 'Product % (ID: %) quantity is below minimum threshold (10). Current quantity: %', 
                        NEW.product_name, NEW.product_id, NEW.quantity;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_minimum_product_quantity
BEFORE INSERT OR UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION check_product_quantity();