// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   Layout,
//   Text,
//   BlockStack,
//   Page,
// } from "@shopify/polaris";
// import { TitleBar } from "@shopify/app-bridge-react";

// export default function PricingPage() {
//   const [images, setImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [apiResponse, setApiResponse] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleImageChange = (event) => {
//     const files = event.target.files;
//     if (files) {
//       const newImages = Array.from(files);
//       setImages([...images, ...newImages]);

//       const newImagePreviews = Array.from(files).map((file) => {
//         return URL.createObjectURL(file);
//       });
//       setImagePreviews([...imagePreviews, ...newImagePreviews]);
//     }
//   };

//   const handleAdditionalAction = async () => {
//     const formData = new FormData();
//     images.forEach((image) => {
//       formData.append("images", image);
//     });

//     setIsLoading(true);

//     try {
//       const response = await fetch("http://localhost:5000/generate-description", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok " + response.statusText);
//       }

//       const result = await response.json();
//       setApiResponse(result);
//     } catch (error) {
//       console.error("Error processing images:", error);
//       setApiResponse({ error: error.message });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Page>
//       <TitleBar title="Ai Title and Description  Page" />
//       <Layout>
//         <Layout.Section>
//           <Card>
//             <BlockStack gap="300">
//               <Text as="h2" variant="headingMd">
//                 Upload Images
//               </Text>
//               <input type="file" multiple onChange={handleImageChange} />
//               <div style={{ display: "flex", flexWrap: "wrap" }}>
//                 {imagePreviews.map((preview, index) => (
//                   <img
//                     key={index}
//                     src={preview}
//                     alt={`Uploaded ${index}`}
//                     style={{
//                       width: "150px", // Set width to medium size
//                       height: "150px", // Set height to medium size
//                       objectFit: "cover",
//                       marginTop: "10px",
//                       marginRight: "10px",
//                     }}
//                   />
//                 ))}
//               </div>
//             </BlockStack>
//           </Card>
//         </Layout.Section>
//       </Layout>

//       {/* Section for additional action */}
//       {images.length > 0 && (
//         <Layout>
//           <Layout.Section>
//             <Card>
//               <BlockStack gap="300">
//                 <Button onClick={handleAdditionalAction} loading={isLoading}>
//                   {isLoading ? "Processing..." : "Generate Description"}
//                 </Button>
//               </BlockStack>
//             </Card>
//           </Layout.Section>
//         </Layout>
//       )}

//       {/* Section to display API response */}
//       {apiResponse && (
//         <Layout>
//           <Layout.Section>
//             <Card>
//               <BlockStack gap="300">
//                 <Text as="h2" variant="headingMd">
//                   API Response
//                 </Text>
//                 <Box
//                   padding="4"
//                   borderColor="border"
//                   borderWidth="1"
//                   borderRadius="2"
//                   overflow="auto"
//                   background="bg-subdued"
//                 >
//                   <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
//                     {typeof apiResponse === "string"
//                       ? apiResponse
//                       : JSON.stringify(apiResponse, null, 2)}
//                   </pre>
//                 </Box>
//               </BlockStack>
//             </Card>
//           </Layout.Section>
//         </Layout>
//       )}
//     </Page>
//   );
// }

// function Code({ children }) {
//   return (
//     <Box
//       as="span"
//       padding="025"
//       paddingInlineStart="100"
//       paddingInlineEnd="100"
//       background="bg-surface-active"
//       borderWidth="025"
//       borderColor="border"
//       borderRadius="100"
//     >
//       <code>{children}</code>
//     </Box>
//   );
// }

import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Layout,
  Text,
  Page,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function PricingPage() {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [apiResponse, setApiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      setImages([...images, ...newImages]);

      const newImagePreviews = Array.from(files).map((file) => {
        return URL.createObjectURL(file);
      });
      setImagePreviews([...imagePreviews, ...newImagePreviews]);
    }
  };

  const handleAdditionalAction = async () => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/generate-description", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const result = await response.json();
      setApiResponse(result);
    } catch (error) {
      console.error("Error processing images:", error);
      setApiResponse({ error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Page>
      <TitleBar title="AI Title and Description Page" />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <div style={{ marginBottom: "1rem" }}>
              <Text>
                Upload Images
              </Text>
              <input type="file" multiple onChange={handleImageChange} />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Uploaded ${index}`}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    marginTop: "10px",
                    marginRight: "10px",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                />
              ))}
            </div>
          </Card>
        </Layout.Section>
      </Layout>

      {images.length > 0 && (
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <Button primary onClick={handleAdditionalAction} loading={isLoading}>
                {isLoading ? "Processing..." : "Generate Description"}
              </Button>
            </Card>
          </Layout.Section>
        </Layout>
      )}

      {apiResponse && (
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <Text>
                API Response
              </Text>
              <Box padding="small" borderColor="border" borderWidth="thin" borderRadius="4px" background="subdued">
                <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                  {typeof apiResponse === "string"
                    ? apiResponse
                    : JSON.stringify(apiResponse, null, 2)}
                </pre>
              </Box>
            </Card>
          </Layout.Section>
        </Layout>
      )}
    </Page>
  );
}
