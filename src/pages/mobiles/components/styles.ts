import styled from 'styled-components';
import { Card, Typography, Form, Modal } from 'antd';

export const MobilesListContainer = styled.div`
  width: 100%;
`;

export const ListContentWrapper = styled.div`
  width: 100%;
`;

export const MobilesListHeader = styled.div`
  margin-bottom: 24px;
`;

export const MobilesListContent = styled.div`
  height: calc(100vh - 200px);
`;

export const MobileItemContainer = styled.div`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
`;

export const MobileItemCard = styled(Card)`
  width: 100%;
  max-width: 100%;
  margin: 0;
`;

export const MobileItemForm = styled(Form)`
  width: 100%;
`;

export const MobileItemContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const MobileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  width: 100%;
  min-height: 48px;
`;

export const MobileImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 12px;
  flex-shrink: 0;
`;

export const MobileTitleContainer = styled.div`
  flex: 1;
  min-width: 0;
  overflow: hidden;
`;

export const MobileTitle = styled(Typography.Title)`
  margin: 0;
  font-size: 16px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const MobileDescription = styled(Typography.Paragraph)`
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

export const MobileStats = styled.div`
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

export const MobileDetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const MobileDetailImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 8px;
`;

export const MobileDetailContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const MobileSpecs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

export const SpecItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SpecLabel = styled.span`
  font-size: 12px;
  color: #666;
`;

export const SpecValue = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

export const PerformanceSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
`;

export const ReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ReviewStats = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ReviewSummary = styled(Typography.Paragraph)`
  margin: 0;
  font-size: 14px;
  color: #666;
`; 