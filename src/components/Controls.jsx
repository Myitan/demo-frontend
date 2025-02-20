const Controls = ({ brightness, onBrightnessChange, onGrayscale, onPrewitt, processedImage, apiBase , onChannelChange, onApplyFilter,onDetectFeatures, blendValue, onBlendChange, onSecondImageUpload, secondImage }) => (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brightness Control
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={brightness}
            onChange={(e) => onBrightnessChange(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            disabled={!processedImage}
          />
          <span className="block text-center text-gray-600 mt-1">{brightness}x</span>
        </div>
  
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onGrayscale}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={!processedImage}
          >
            Convert to Grayscale
          </button>
          
          <button
            onClick={onPrewitt}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={!processedImage}
          >
            Apply Prewitt Edge
          </button>
        </div>
  
        {processedImage && (
          <a
            href={`${apiBase}/download/${processedImage}`}
            download
            className="block w-full px-4 py-2 text-center bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Download Processed Image
          </a>
        )}
      </div>


        <div className="space-y-4">
        {/* Add RGB Channel Controls */}
        <div className="space-y-2">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Red Channel
            </label>
            <input
                type="range"
                min="-100"
                max="100"
                step="1"
                onChange={(e) => onChannelChange('red', e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                disabled={!processedImage}
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Green Channel
            </label>
            <input
                type="range"
                min="-100"
                max="100"
                step="1"
                onChange={(e) => onChannelChange('green', e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                disabled={!processedImage}
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Blue Channel
            </label>
            <input
                type="range"
                min="-100"
                max="100"
                step="1"
                onChange={(e) => onChannelChange('blue', e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                disabled={!processedImage}
            />
            </div>
        </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            
            <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-medium mb-3">Image Filters</h3>
            <div className="grid grid-cols-2 gap-2">
                <button
                onClick={() => onApplyFilter('average')}
                className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
                disabled={!processedImage}
                >
                Average
                </button>
                <button
                onClick={() => onApplyFilter('disk')}
                className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
                disabled={!processedImage}
                >
                Disk
                </button>
                <button
                onClick={() => onApplyFilter('laplacian')}
                className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
                disabled={!processedImage}
                >
                Laplacian
                </button>
                <button
                onClick={() => onApplyFilter('sobel')}
                className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
                disabled={!processedImage}
                >
                Sobel
                </button>
                <button
                onClick={() => onApplyFilter('log')}
                className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
                disabled={!processedImage}
                >
                LoG
                </button>
            </div>
            </div>
        </div>

        <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-medium mb-3">Feature Detection</h3>
        <div className="grid grid-cols-2 gap-2">
            <button
            onClick={() => onDetectFeatures('fast')}
            className="px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
            disabled={!processedImage}
            >
            FAST
            </button>
            <button
            onClick={() => onDetectFeatures('harris')}
            className="px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
            disabled={!processedImage}
            >
            Harris
            </button>
            <button
            onClick={() => onDetectFeatures('kaze')}
            className="px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
            disabled={!processedImage}
            >
            KAZE
            </button>
            <button
            onClick={() => onDetectFeatures('mser')}
            className="px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
            disabled={!processedImage}
            >
            MSER
            </button>
        </div>
    </div>

          <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-medium mb-3">Image Fusion</h3>
              
              <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Second Image
                  </label>
                  <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => onSecondImageUpload(e.target.files[0])}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      disabled={!processedImage}
                  />
              </div>

              {secondImage && (
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blend Strength ({Number(blendValue).toFixed(1)})
                      </label>
                      <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={blendValue}
                          onChange={(e) => onBlendChange(e.target.value)}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                          disabled={!secondImage}
                      />
                  </div>
              )}
          </div>


    </div>
  );
  
  export default Controls;