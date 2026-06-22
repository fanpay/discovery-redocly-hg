import React from 'react';
import styled from 'styled-components';

import { ArrowRightIcon, Button } from '@redocly/theme';
import { Card } from '@redocly/theme/markdoc/components/Cards/Card';
import { Cards } from '@redocly/theme/markdoc/components/Cards/Cards';

export default function HomePage() {
  return (
    <div>
      <HeroContainer>
        <HeroBg />
        <HeroEyebrow>DEVELOPER PORTAL</HeroEyebrow>
        <h1>Build faster with our developer tools</h1>
        <p>
          Comprehensive resources for guides, technical documentation, and API references
          for payment and data solutions.
        </p>
        <ButtonContainer>
          <Button size="large" variant="primary" tone="brand" to="/docs/guides/">
            Get started
          </Button>
          <Button size="large" to="/apis/openapi.yaml">
            Explore APIs
          </Button>
        </ButtonContainer>
      </HeroContainer>

      <Container>
        <h3>Accelerate development with the tools you need to succeed</h3>
        <p>
          Use these developer resources to integrate faster, understand our APIs,
          and give your team a clear path from onboarding to production.
        </p>
      </Container>

      <Container>
        <h3>Start here</h3>

        <Cards>
          <Card title="Guides" to="/docs/guides/">
            Step-by-step documentation to help your team implement and launch faster.
          </Card>
          <Card title="API Reference" to="/apis/openapi.yaml">
            Browse endpoints, models, authentication details, and request examples.
          </Card>
          <Card title="Tutorials" to="/docs/tutorials/">
            Walkthroughs for common payment integration patterns.
          </Card>
        </Cards>
      </Container>

      <Container>
        <h3>Why teams use this portal</h3>

        <Feature>
          <ArrowRightIcon />
          <p>Clear implementation guidance for payment and platform integrations.</p>
        </Feature>
        <Feature>
          <ArrowRightIcon />
          <p>Developer-ready API documentation in one place.</p>
        </Feature>
        <Feature>
          <ArrowRightIcon />
          <p>Faster onboarding for engineers, partners, and solution teams.</p>
        </Feature>
        <Feature>
          <ArrowRightIcon />
          <p>Centralized access to guides, tutorials, and technical references.</p>
        </Feature>
      </Container>

      <Container>
        <h3>Featured resources</h3>

        <Cards>
          <Card title="Integration Guides" to="/docs/guides/">
            Learn the recommended path for getting up and running quickly.
          </Card>
          <Card title="Tutorials" to="/docs/tutorials/">
            Walk through common payment integration flows end to end.
          </Card>
        </Cards>
      </Container>

      <Container>
        <ContactUsSection>
          <h3>Need help?</h3>
          <ButtonContainer>
            <Button variant="outlined" size="large" to="/about">
              Contact us
            </Button>
            <Button variant="outlined" size="large" to="/docs/guides/">
              Read the docs
            </Button>
          </ButtonContainer>
        </ContactUsSection>
      </Container>
    </div>
  );
}

const HeroBg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(ellipse at 60% 40%, rgba(214, 17, 45, 0.12) 0%, transparent 70%),
              radial-gradient(ellipse at 20% 80%, rgba(214, 17, 45, 0.07) 0%, transparent 60%);
`;

const HeroContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 32px 72px;
  position: relative;
  text-align: center;

  h1 {
    color: var(--text-color-primary);
    font-size: 64px;
    font-weight: 700;
    line-height: 72px;
    letter-spacing: 0.2px;
    margin: 20px 0 20px 0;
    max-width: 900px;
  }

  > p {
    color: var(--text-color-secondary);
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
    margin: 0 0 32px 0;
    max-width: 820px;
  }
`;

const HeroEyebrow = styled.div`
  color: #d6112dff;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1.6px;
  margin-top: 72px;
`;

const Container = styled.div`
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--text-color-secondary);
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  width: min(90%, 1000px);
  margin: 64px auto 0;

  a {
    text-decoration: none;
  }

  p {
    margin: 0;
  }

  h3 {
    color: var(--text-color-primary);
    font-size: 28px;
    font-weight: 600;
    line-height: 36px;
    margin: 0 0 24px 0;
  }
`;

const Feature = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 16px;

  svg {
    height: 16px;
    width: 16px;
    margin-top: 6px;
    flex-shrink: 0;

    path {
      fill: #d6112d;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: var(--spacing-xs);
  justify-content: center;
  flex-wrap: wrap;
`;

const ContactUsSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
  gap: var(--spacing-xs);

  h3 {
    margin: 0;
  }
`;