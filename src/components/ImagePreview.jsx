const ImagePreview = ({ title, imageUrl, apiBase, loading }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
        {imageUrl ? (
          <img
            src={`${apiBase}/processed/${imageUrl}?t=${new Date().getTime()}`}            alt={title}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            {loading ? 'Processing...' : 'No image selected'}
          </div>
        )}
      </div>
    </div>
  );
  
  export default ImagePreview;