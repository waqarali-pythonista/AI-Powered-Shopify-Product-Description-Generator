import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  TextField,
  BlockStack,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function PricingPage() {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [additionalData, setAdditionalData] = useState("");

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

  const handleAdditionalDataChange = (value) => {
    setAdditionalData(value);
  };

  const handleAdditionalAction = async () => {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await fetch("http://localhost:5000/process_images", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Product description and features:", result);
      // You can display the result in your UI or perform other actions with it
    } catch (error) {
      console.error("Error processing images:", error);
    }
  };

  return (
    <Page>
      <TitleBar title="Pricing Page" />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text as="p" variant="bodyMd">
                The app template comes with an additional page which
                demonstrates how to create multiple pages within app navigation
                using{" "}
                <Link
                  url="https://shopify.dev/docs/apps/tools/app-bridge"
                  target="_blank"
                  removeUnderline
                >
                  App Bridge
                </Link>
                .
              </Text>
              <Text as="p" variant="bodyMd">
                To create your own page and have it show up in the app
                navigation, add a page inside <Code>app/routes</Code>, and a
                link to it in the <Code>&lt;NavMenu&gt;</Code> component found
                in <Code>app/routes/app.jsx</Code>.
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd">
                Resources
              </Text>
              <List>
                <List.Item>
                  <Link
                    url="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
                    target="_blank"
                    removeUnderline
                  >
                    App nav best practices
                  </Link>
                </List.Item>
              </List>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>

      {/* Section for multi-image upload */}
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text as="h2" variant="headingMd">
                Upload Images
              </Text>
              <input type="file" multiple onChange={handleImageChange} />
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {imagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Uploaded ${index}`}
                    style={{ maxWidth: "100%", marginTop: "10px", marginRight: "10px" }}
                  />
                ))}
              </div>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>

      {/* Section for additional action and text field */}
      {images.length > 0 && (
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="300">
                <TextField
                  label="Additional Data"
                  value={additionalData}
                  onChange={handleAdditionalDataChange}
                />
                <Button onClick={handleAdditionalAction}>Additional Action</Button>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      )}
    </Page>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
