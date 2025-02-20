const UploadForm = ({ onUpload, loading }) => {
    const handleFileChange = (e) => {
      if (e.target.files[0]) {
        onUpload(e.target.files[0]);
      }
    };
  
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <label className="block">
          <span className="sr-only">Choose image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            disabled={loading}
          />
        </label>
      </div>
    );
  };
  
  export default UploadForm;