export default function ImageCard({ data }) {
  const { gender, name, image } = data;
  return (
    <div className="bg-gray-300 rounded-lg shadow-md p-4">
      <div className="w-full  bg-gray-300 rounded-md mb-4">
        <img src={image} alt={name} />
      </div>
      <div className=" rounded-md w-3/4 mb-2">{name}</div>
      <div className=" rounded-md w-1/2">{gender}</div>
    </div>
  );
}
