export const Button = ({ title }) => {
  return (
    <button className="px-4 py-1 bg-black text-white border border-gray-600 rounded-md transition-all duration-200 hover:bg-white hover:text-black cursor-pointer">
      {title}
    </button>
  );
};
