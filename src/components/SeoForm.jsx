import React from 'react';

// EN: SeoForm component for managing SEO and OpenGraph metadata
// HI: SEO और OpenGraph metadata को manage करने के लिए SeoForm component
const SeoForm = ({ seo, onChange, className = "" }) => {

  // EN: Handle changes in nested SEO fields
  // HI: Nested SEO fields में changes को handle करें
  const handleSeoChange = (field, value, parent = null) => {
    const newSeo = { ...seo };
    if (parent) {
      newSeo[parent] = { 
        ...newSeo[parent], 
        [field]: value 
      };
    } else {
      newSeo[field] = value;
    }
    onChange(newSeo);
  };

  // EN: Handle changes in OpenGraph image fields
  // HI: OpenGraph image fields में changes को handle करें
  const handleOpenGraphImageChange = (field, value) => {
    const newSeo = {
      ...seo,
      openGraph: {
        ...seo.openGraph,
        images: [
          {
            ...(seo.openGraph?.images?.[0] || {}),
            [field]: value
          }
        ]
      }
    };
    onChange(newSeo);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900">
        SEO Settings
      </h3>

      {/* EN: Basic SEO Fields */}
      {/* HI: मुख्य SEO फील्ड्स */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Meta Title
            <span className="text-xs text-gray-500 ml-1">(Search results में दिखने वाला title)</span>
          </label>
          <input
            type="text"
            value={seo?.title || ''}
            onChange={(e) => handleSeoChange('title', e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="Enter meta title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Meta Description
            <span className="text-xs text-gray-500 ml-1">(Search results में दिखने वाला description)</span>
          </label>
          <textarea
            value={seo?.description || ''}
            onChange={(e) => handleSeoChange('description', e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            rows={3}
            placeholder="Enter meta description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Canonical URL
            <span className="text-xs text-gray-500 ml-1">(Duplicate content को avoid करने के लिए)</span>
          </label>
          <input
            type="text"
            value={seo?.canonical || ''}
            onChange={(e) => handleSeoChange('canonical', e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="https://example.com/page"
          />
        </div>
      </div>

      {/* EN: OpenGraph Fields */}
      {/* HI: OpenGraph फील्ड्स (Social Media Sharing के लिए) */}
      <div className="space-y-4 border-t pt-4">
        <h4 className="font-medium text-gray-900">
          Open Graph Tags
          <span className="text-xs text-gray-500 ml-1">(Social media sharing के लिए)</span>
        </h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            OG Title
          </label>
          <input
            type="text"
            value={seo?.openGraph?.title || ''}
            onChange={(e) => handleSeoChange('title', e.target.value, 'openGraph')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="Title for social sharing"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            OG Description
          </label>
          <textarea
            value={seo?.openGraph?.description || ''}
            onChange={(e) => handleSeoChange('description', e.target.value, 'openGraph')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            rows={3}
            placeholder="Description for social sharing"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            OG URL
          </label>
          <input
            type="text"
            value={seo?.openGraph?.url || ''}
            onChange={(e) => handleSeoChange('url', e.target.value, 'openGraph')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="https://example.com/page"
          />
        </div>

        {/* EN: OpenGraph Image Fields */}
        {/* HI: OpenGraph इमेज फील्ड्स (Social Media Preview Image) */}
        <div className="space-y-4 border-t pt-4">
          <h4 className="font-medium text-gray-900">
            OG Image
            <span className="text-xs text-gray-500 ml-1">(Social media preview image)</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                value={seo?.openGraph?.images?.[0]?.url || ''}
                onChange={(e) => handleOpenGraphImageChange('url', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Alt Text</label>
              <input
                type="text"
                value={seo?.openGraph?.images?.[0]?.alt || ''}
                onChange={(e) => handleOpenGraphImageChange('alt', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Image description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Width (px)</label>
              <input
                type="number"
                value={seo?.openGraph?.images?.[0]?.width || ''}
                onChange={(e) => handleOpenGraphImageChange('width', parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="1200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Height (px)</label>
              <input
                type="number"
                value={seo?.openGraph?.images?.[0]?.height || ''}
                onChange={(e) => handleOpenGraphImageChange('height', parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="630"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeoForm;