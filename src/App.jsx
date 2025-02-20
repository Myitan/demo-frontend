import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import axios from 'axios';
import UploadForm from './components/UploadForm';
import ImagePreview from './components/ImagePreview';
import Controls from './components/Controls';

const App = () => {
  const [originalImage, setOriginalImage] = useState('');
  const [processedImage, setProcessedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [brightness, setBrightness] = useState(1);

  const API_BASE = 'http://localhost:8080';

  const handleUpload = async (file) => {
    try {
      setError('');
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${API_BASE}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setOriginalImage(response.data.originalImage);
      setProcessedImage(response.data.processedImage);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const processImage = async (endpoint) => {
    try {
      setError('');
      setLoading(true);
      const response = await axios.post(`${API_BASE}${endpoint}`, {
        currentImage: processedImage
      });

      setProcessedImage(response.data.processedImage);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Processing failed');
    } finally {
      setLoading(false);
    }
  };

  const debouncedBrightness = useDebouncedCallback((value) => {
    const adjustBrightness = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`${API_BASE}/adjust-brightness`, {
          value: parseFloat(value),
          currentImage: processedImage
        });

        setProcessedImage(response.data.processedImage);
      } catch (err) {
        setError(err.response?.data?.error || 'Brightness adjustment failed');
      } finally {
        setLoading(false);
      }
    };
    
    if (processedImage) {
      adjustBrightness();
    }
  }, 500);

  const onChannelChange = async (channel, value) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE}/adjust-channel`, {
        channel: channel,
        value: parseFloat(value),
        currentImage: processedImage
      });
      
      setProcessedImage(response.data.processedImage);
    } catch (err) {
      setError(err.response?.data?.error || 'Channel adjustment failed');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilter = async (filterType) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE}/apply-filter`, {
        filterType: filterType,
        currentImage: processedImage
      });
      
      setProcessedImage(response.data.processedImage);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Filter application failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDetectFeatures = async (detectorType) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE}/detect-features`, {
        detectorType: detectorType,
        currentImage: processedImage
      });
      
      setProcessedImage(response.data.processedImage);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Feature detection failed');
    } finally {
      setLoading(false);
    }
  };

  const [secondImage, setSecondImage] = useState('');
  const [blendValue, setBlendValue] = useState(0.0);

  const handleSecondUpload = async (file) => {
    try {
        setError('');
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${API_BASE}/upload-second`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        setSecondImage(response.data.secondImage);
        setError('');
    } catch (err) {
        setError(err.response?.data?.error || 'Second image upload failed');
    } finally {
        setLoading(false);
    }  
  };

  const handleBlendChange = useDebouncedCallback((value) => {
    if (!processedImage || !secondImage) return;

    const blendImages = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${API_BASE}/image-fusion`, {
                currentImage: processedImage,
                secondImage: secondImage,
                blendValue: parseFloat(value)
            });
            setProcessedImage(response.data.processedImage);
        } catch (err) {
            setError(err.response?.data?.error || 'Image fusion failed');
        } finally {
            setLoading(false);
        }
    };
    blendImages();
  }, 500);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Image Processor</h1>
        
        <UploadForm onUpload={handleUpload} loading={loading} />
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <ImagePreview 
            title="Original Image" 
            imageUrl={originalImage} 
            apiBase={API_BASE}
          />
          
          <ImagePreview
            title="Processed Image"
            imageUrl={processedImage}
            apiBase={API_BASE}
            loading={loading}
          />
        </div>

        <Controls
          brightness={brightness}
          onBrightnessChange={(value) => {
            setBrightness(value);
            debouncedBrightness(value);
          }}
          onGrayscale={() => processImage('/grb2gray')}
          onPrewitt={() => processImage('/prewitt')}
          onChannelChange={onChannelChange}
          onApplyFilter={handleApplyFilter}
          onDetectFeatures={handleDetectFeatures}
          blendValue={blendValue}
          onBlendChange={(value) => {
            setBlendValue(value);
            handleBlendChange(value);
          }}
          onSecondImageUpload={handleSecondUpload}
          secondImage={secondImage}
          processedImage={processedImage}
          apiBase={API_BASE}
        />
      </div>
    </div>
  );
};

export default App;