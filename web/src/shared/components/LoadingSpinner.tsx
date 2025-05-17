
const Loader = () => {
  return (
    <span className='relative inline-block w-12 h-12 rounded-full border-t-4 border-white border-r-4 border-r-transparent animate-spin'>
      <span
        className='absolute left-0 top-0 w-full h-full rounded-full border-l-4 border-red-600 border-b-4 border-b-transparent'
        style={{ animation: 'spin-reverse 0.5s linear infinite' }}
      ></span>

      <style>
        {`
          @keyframes spin-reverse {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
          }
        `}
      </style>
    </span>
  );
};

export default Loader;



// usage:
// <div className='flex items-center justify-center min-h-screen bg-gray-900'>
//   <Loader />
// </div>;