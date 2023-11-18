export default function Loading() {
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen bg-black animate-pulse">
        <div className="w-12 h-12 rounded-full border-t-4 border-blue-500 border-solid animate-spin"></div>
      </div>
    </>
  );
}
