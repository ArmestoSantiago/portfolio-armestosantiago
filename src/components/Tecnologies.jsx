import { AstroIcon, CloudIcon, CSSIcon, Express, FirebaseIcon, GitIcon, HTMLIcon, JavaScriptIcon, NodeIcon, ReactIcon, SQLiteIcon, TailwindIcon, TensorFlowIcon, TursoIcon, TypeScriptIcon, ViteIcon } from './icons';

export function Tecnologies() {
  const tecnologies = [{ tecnologie: 'JavaScript', component: <JavaScriptIcon /> },
  { tecnologie: 'HTML', component: <HTMLIcon /> },
  { tecnologie: 'CSS', component: <CSSIcon /> },
  { tecnologie: 'TypeScript', component: <TypeScriptIcon /> },
  { tecnologie: 'React', component: <ReactIcon /> },
  { tecnologie: 'SQLite', component: <SQLiteIcon /> },
  { tecnologie: 'Git', component: <GitIcon /> },
  { tecnologie: 'TailwindCSS', component: <TailwindIcon /> },
  { tecnologie: 'Astro', component: <AstroIcon /> },
  { tecnologie: 'Google Cloud', component: <CloudIcon /> },
  { tecnologie: 'Firebase', component: <FirebaseIcon /> },
  { tecnologie: 'Node.js', component: <NodeIcon /> },
  { tecnologie: 'Express', component: <Express /> },
  { tecnologie: 'Vite', component: <ViteIcon /> },
  { tecnologie: 'Turso', component: <TursoIcon /> },
  { tecnologie: 'TensorFlow', component: <TensorFlowIcon /> }];

  return (
    <>
      {tecnologies.map((tecnologie, index) => {
        return (<div className="flex" key={index}>{tecnologie.component}</div>);
      })}
    </>
  );
}