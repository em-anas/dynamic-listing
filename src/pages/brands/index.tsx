import React from "react";
import { PageContainer, SectionContainer, Text, Title } from "../../components";
import { BrandsList } from "./components";

export const BrandsPage: React.FC = () => {
  return (
    <PageContainer maxWidth="xxl">
      <SectionContainer
        textAlign="center"
        margin="0 auto var(--spacing-xl) auto"
      >
        <Title variant="h2" noMargin>
          Mobile Brands
        </Title>
        <Text variant="body" customColor="secondary">
          Manage and explore mobile device brands
        </Text>
      </SectionContainer>
      <BrandsList />
    </PageContainer>
  );
};
