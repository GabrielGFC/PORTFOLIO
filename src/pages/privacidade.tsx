import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SiteFooter from "../components/lux/SiteFooter";
import SiteHeader from "../components/lux/SiteHeader";
import { PageTransition } from "../motion/motion";
import styles from "./legal.module.scss";

const EMAIL = "carvalhofernandesgfc@proton.me";

const Privacidade: React.FC = () => {
  useEffect(() => {
    document.title = "Política de Privacidade | Gabriel Fernandes de Carvalho";
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <SiteHeader />
      <main id="conteudo" tabIndex={-1} className={styles.page} lang="pt-BR">
        <div className={styles.wrap}>
          <Link to="/" className={styles.back}>
            ← Voltar ao portfólio
          </Link>

          <header className={styles.header}>
            <h1 className={styles.title}>Política de Privacidade</h1>
            <p className={styles.subtitle}>Última atualização: 06/11/2026</p>
          </header>

          <aside className={styles.summary} aria-labelledby="resumo">
            <h2 id="resumo">Em resumo</h2>
            <ul>
              <li>Este site não tem formulários, login, banco de dados, anúncios nem ferramentas de análise de visitas.</li>
              <li>Ele não grava cookies. Guarda só dois itens no navegador: um temporário, para não repetir uma animação, e a marca de que você viu o aviso de privacidade.</li>
              <li>
                O único jeito de me passar dados é escrever para mim por e-mail. Só uso o que você enviar para
                responder.
              </li>
              <li>Você pode pedir acesso, correção ou exclusão dos seus dados quando quiser.</li>
            </ul>
          </aside>

          <section className={styles.section}>
            <h2>1. Quem é o responsável</h2>
            <p>
              <strong>Gabriel Fernandes de Carvalho</strong>, pessoa física, de Anápolis (GO), é quem decide como os dados
              enviados por este site são usados (o “controlador”, na LGPD, Lei nº 13.709/2018). Contato:{" "}
              <a className={styles.link} href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
              .
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. O que acontece quando você visita o site</h2>
            <ul>
              <li>
                <strong>Registros da hospedagem.</strong> O site é publicado no GitHub Pages. Como em qualquer hospedagem,
                o GitHub pode registrar dados técnicos da visita, como endereço IP e tipo de navegador. Esse registro é
                feito pelo GitHub, segundo a política dele, e eu não tenho acesso a esses dados.
              </li>
              <li>
                <strong>Armazenamento no seu navegador.</strong> Um item temporário (<code>gfc-mark-played</code>, em{" "}
                <code>sessionStorage</code>) avisa que a animação do logotipo já rodou e some ao fechar a aba. Outro (
                <code>gfc-privacy-consent</code>, em <code>localStorage</code>) registra que você clicou em “Entendi” no
                aviso. Nenhum identifica você nem é enviado a lugar nenhum. Detalhes na{" "}
                <Link className={styles.link} to="/cookies">
                  página de cookies
                </Link>
                .
              </li>
              <li>
                <strong>Sem rastreamento.</strong> Não uso Google Analytics, pixels de anúncio, mapas ou vídeos
                incorporados. As fontes de letra ficam no próprio site, sem pedir nada a serviços externos.
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. Quando você me escreve</h2>
            <p>
              Os botões “Enviar e-mail” e “Fale comigo” abrem o seu programa de e-mail. A mensagem só chega a mim se você a
              enviar. Nesse caso recebo o seu nome, o endereço de e-mail e o que você escrever (por exemplo, a descrição de
              uma vaga). Meu e-mail é atendido por um provedor de caixa postal, que guarda as mensagens em nome dele.
            </p>
            <ul>
              <li>
                <strong>Para quê:</strong> responder à sua mensagem e, se for uma proposta de trabalho, dar andamento à
                conversa.
              </li>
              <li>
                <strong>Base legal (LGPD, art. 7º):</strong> legítimo interesse em responder a quem me procura (inciso IX)
                e, quando se tratar de uma contratação, a realização de procedimentos preliminares ligados a um contrato
                (inciso V).
              </li>
              <li>
                <strong>Por quanto tempo:</strong> pelo tempo necessário para a conversa e para o registro de um processo
                seletivo. Você pode pedir a exclusão antes disso.
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>4. Compartilhamento</h2>
            <p>
              Não vendo nem cedo dados a terceiros, e não repasso suas mensagens sem a sua autorização. Os links do site
              (LinkedIn, GitHub e os sistemas publicados dos projetos) levam a serviços de outras pessoas e empresas. Ao
              clicar, valem as políticas deles.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Seus direitos (LGPD, art. 18)</h2>
            <p>
              Você pode pedir a confirmação de que trato dados seus, o acesso a eles, a correção, a anonimização, a
              portabilidade, a eliminação, informações sobre compartilhamento e a revogação de consentimento, quando ele
              existir. Escreva para{" "}
              <a className={styles.link} href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>{" "}
              e eu respondo o quanto antes. Se não ficar satisfeito, você pode recorrer à Autoridade Nacional de Proteção
              de Dados (ANPD), em gov.br/anpd.
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. Segurança</h2>
            <p>
              O site é servido por HTTPS. Por não coletar dados por conta própria, ele tem pouca superfície de risco. Os
              dados que chegam por e-mail ficam apenas na minha caixa postal.
            </p>
          </section>

          <section className={styles.section}>
            <h2>7. Dados de terceiros nos projetos</h2>
            <p>
              Os projetos mostrados aqui são capturas e descrições de trabalho. Nenhuma informação pessoal de usuários
              desses sistemas é exibida neste site.
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. Mudanças nesta política</h2>
            <p>
              Se o site passar a coletar algo novo, esta página será atualizada antes disso, e a data no topo mostra a
              versão em vigor.
            </p>
            <p className={styles.note}>
              Este texto foi escrito por mim, com base na LGPD, para explicar de forma clara o que o site faz. Ele não
              substitui orientação jurídica.
            </p>
          </section>

          <nav className={styles.legalNav} aria-label="Documentos legais">
            <Link to="/termos" className={styles.legalNavLink}>
              Termos de Uso
            </Link>
            <Link to="/cookies" className={styles.legalNavLink}>
              Cookies
            </Link>
          </nav>
        </div>
      </main>
      <SiteFooter />
    </PageTransition>
  );
};

export default Privacidade;
