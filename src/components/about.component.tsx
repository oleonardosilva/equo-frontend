import { ReactTyped } from "react-typed";

function About() {
  const commentLines = [
    `
    // O projeto Equo investiga os impactos ambientais causados pela <br>// Inteligência Artificial, desde seu uso até o treinamento de modelos. <br>// Além de analisar os efeitos atuais, a pesquisa também considera a tendência da <br>// computação quântica, estudando como seu enorme poder de processamento pode <br>// reduzir tais impactos. Dessa forma, o Equo busca compreender o presente e apontar<br>// caminhos para um futuro tecnológico mais sustentável. <br>
  `,
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <span className="text-secondary text-lg">Olá, seja bem-vindo ao</span>
      <span className="text-secondary text-7xl">Projeto Equo</span>
      <br />
      <span className="text-tertiary text-base">
        {"> Estudado por Gustavo, Leonardo, Mateus, Pedro, Thiago"}
      </span>
      <br />
      <br />
      <br />
      <span className="whitespace-pre">
        <ReactTyped
          strings={commentLines}
          typeSpeed={36}
          backSpeed={0}
          showCursor={true}
          cursorChar="|"
          loop={false}
        />
      </span>
    </div>
  );
}

export default About;
