export default function Header({ component }) {
  return (
    <>
      <h1 className="text-2xl font-bold text-blue-800 mb-4">
        {component.Name}
      </h1>
      <p className="text-gray-600 mb-4">{component.Desc}</p>
      <hr className="my-6 border-gray-200" />
    </>
  );
}
