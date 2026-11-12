import { useReducedMotion } from "framer-motion";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SiteHeader from "../../components/lux/SiteHeader";
import Intro from "../../components/lux/Intro";
import Numbers from "../../components/lux/Numbers";
import SelectedWork from "../../components/lux/SelectedWork";
import Timeline from "../../components/lux/Timeline";
import About from "../../components/lux/About";
import Closing from "../../components/lux/Closing";
import PrivacyConsent from "../../components/PrivacyConsent";
import SiteFooter from "../../components/lux/SiteFooter";
import { PageTransition, scrollToSection } from "../../motion/motion";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gabriel Fernandes de Carvalho",
  jobTitle: "Desenvolvedor de software",
  url: "https://gabrielgfc.github.io/Portifolio/",
  sameAs: ["https://www.linkedin.com/in/gabrielgfc1", "https://github.com/GabrielGFC"],
};

const Portfolio: React.FC = () => {
  const location = useLocation();
  const reduce = !!useReducedMotion();

  useEffect(() => {
    document.title = "Gabriel Fernandes de Carvalho | Desenvolvedor Backend e Full Stack";
  }, []);

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (target) {
      const id = window.setTimeout(() => scrollToSection(target, reduce), 180);
      return () => window.clearTimeout(id);
    }
    window.scrollTo(0, 0);
    return undefined;
  }, [location.state, reduce]);

  return (
    <PageTransition>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <main id="conteudo" tabIndex={-1}>
        <Intro />
        <Numbers />
        <Timeline />
        <SelectedWork />
        <About />
        <Closing />
      </main>
      <SiteFooter />
      <PrivacyConsent />
    </PageTransition>
  );
};

export default Portfolio;
