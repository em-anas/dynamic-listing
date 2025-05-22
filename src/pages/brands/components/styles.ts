import styled from "styled-components";
import { Card, Typography, Form } from "antd";

export const BrandsListContainer = styled.div`
  width: 100%;
`;

export const ListContentWrapper = styled.div`
  width: 100%;
`;

export const BrandsListHeader = styled.div`
  margin-bottom: 24px;
`;

export const BrandsListContent = styled.div`
  height: calc(100vh - 200px);
`;

export const BrandItemContainer = styled.div`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

export const BrandItemCard = styled(Card)`
  width: 100%;
  max-width: 100%;
  margin: 0;
`;

export const BrandItemForm = styled(Form)`
  width: 100%;
`;

export const BrandItemContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const BrandHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  width: 100%;
  min-height: 48px;
`;

export const BrandLogo = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 12px;
  flex-shrink: 0;
`;

export const BrandTitleContainer = styled.div`
  flex: 1;
  min-width: 0;
  overflow: hidden;
`;

export const BrandTitle = styled(Typography.Title)`
  margin: 0;
  font-size: 16px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const BrandDescription = styled(Typography.Paragraph)`
  margin: 0;
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  height: 63px;
`;

export const BrandStats = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 12px;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #666;
`;

export const ButtonText = styled.span`
  margin-left: 4px;
`;

export const BrandDetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const BrandDetailLogo = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 8px;
`;

export const BrandDetailContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const BrandVariants = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
