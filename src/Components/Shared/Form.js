import React, { useState } from "react"
import styled from "styled-components";

import Input from '../Shared/Formulario/Input';
import Label from '../Shared/Formulario/Label';

const ButtonSubmit = styled.button`
  border-radius:0.3vh;
  width:15vw;
  height:6vh;
  text-align: center;
  align-items: center;
  font-size: calc(5px + 2vmin);
  color: white;
  border:none;
  cursor:pointer;
  background-color #20bf55;
  background-image linear-gradient(315deg, #20bf55 0%, #01baef 74%);
  transition: box-shadow 0.2s ease-in;
`

const DivForm = styled.form`
  ${props =>`
    border-radius:1vh;
    text-align: center;
    align-items: center;
    ${props.styles}
  `}
`;

const DivHoverWrapper = styled.div`
  &:hover ${ButtonSubmit} {
    box-shadow 0 0 2vh #01baef;
    text-shadow: 0 0 0.3vh white;
  }
`

const DivInput = styled.div`
  ${props =>`
    border-radius:1vh;
    width:100%;
    height:10vh;
    display: flex;
    flex-direction: column; 
    align-items: flex-start;
    align-items:center;
    justify-content:center;
    margin-top:2vh;
    ${props?.styles}
`}`;

const InputCheckbox = styled.input`
  cursor:pointer;
  background:white; 
  width:3vh; 
  height:3vh;
  border-radius:0.5vh; 
  margin-right:2vh;
  margin-bottom:1vh;
  appearance: none;
  transition: 0.3s All ease-in-out;
  &:checked {
    background-color: #20bf55;
    background-image: linear-gradient(315deg,#20bf55 0%,#01baef 74%);
  }
`

const PrivacyPolicy = styled.div`
  ${props => `
    display:${props.active ? "flex" : "none"};
    flex-direction:column;
    align-items:center;
    justfiy-content:center;
    position:absolute;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    background-color: rgba(0,0,0,0.8);
`}`

const CloseWrapper = styled.div`
  display:flex;
  align-items:flex-end;
  justify-content:flex-end;
  width:100%;
`

const CloseButton = styled.button`
  margin-right: 2vh;
  margin-top: 2vh;
  width: 2vw;
  height: 2vw;
  border:none;
  border-radius:0.5vh;
  background-color:red;
  cursor:pointer;
`

const TextWrapper = styled.span`
display:flex;
text-align:left;
align-items:flex-start;
width: 70vw;
height: 90vh;
overflow-y:auto;
`

const LinkWrapper = styled.div`
  width:fit-content;
`


const Form = (props) => {
  const[privacy, setPrivacy] = useState(false);

  const CreateInpunts = () => {
    let view = [];
    props.inputs.forEach(element => {
      switch(element.type){
        case "text":
        case "number":
        case "date":
        case "password":
          view.push(
           <DivInput styles={element.style2}>
            <Label valor={element.label} styles={element.styl}/>
            <Input name={element.name} type={element.type} placeholder={element.label} styles={element.styles}/>
           </DivInput>
           );
        break;
        case "checkbox":
          view.push(
            <DivInput styles={"flex-direction:row;"}>
              <InputCheckbox name={element.name} type={element.type} placeholder={element.label} />
              <LinkWrapper onClick={() => {setPrivacy(true)}}>
                <Label valor={element.label} styles={element.styl}/>
              </LinkWrapper>
              <PrivacyPolicy active={privacy}>
                <CloseWrapper>
                  <CloseButton onClick={(e) => {e.preventDefault(); setPrivacy(false)}}>
                    X
                  </CloseButton>
                </CloseWrapper>
                <TextWrapper>
                POLITICA DE PRIVACIDAD
                <br/>
                <br/>
                Última actualización: Enero 2021.
                <br/>
                <br/>
                - 1. INFORMACIÓN AL USUARIO
                <br/>
                <br/>
                Love Connect, S.L., como Responsable del Tratamiento, le informa que, según lo dispuesto en el Reglamento (UE) 2016/679, de 27 de abril, (RGPD) y en la L.O. 3/2018, de 5 de diciembre, de protección de datos y garantía de los derechos digitales (LOPDGDD), trataremos su datos tal y como reflejamos en la presente Política de Privacidad.

                En esta Política de Privacidad describimos cómo recogemos sus datos personales y por qué los recogemos, qué hacemos con ellos, con quién los compartimos, cómo los protegemos y sus opciones en cuanto al tratamiento de sus datos personales.

                Esta Política se aplica al tratamiento de sus datos personales recogidos por la empresa para la prestación de sus servicios. Si acepta las medidas de esta Política, acepta que tratemos sus datos personales como se define en esta Política.

                <br/>
                <br/>
                - 2. PRINCIPIOS CLAVE
                <br/>
                <br/>
                Siempre hemos estado comprometidos con prestar nuestros servicios con el más alto grado de calidad, lo que incluye tratar sus datos con seguridad y transparencia. Nuestros principios son:

                    Legalidad: Solo recopilaremos sus Datos personales para fines específicos, explícitos y legítimos.
                    Minimización de datos: Limitamos la recogida de datos de carácter personal a lo que es estrictamente relevante y necesario para los fines para los que se han recopilado.
                    Limitación de la Finalidad: Solo recogeremos sus datos personales para los fines declarados y solo según sus deseos.
                    Precisión: Mantendremos sus datos personales exactos y actualizados.
                    Seguridad de los Datos: Aplicamos las medidas técnicas y organizativas adecuadas y proporcionales a los riesgos para garantizar que sus datos no sufran daños, tales como divulgación o acceso no autorizado, la destrucción accidental o ilícita o su pérdida accidental o alteración y cualquier otra forma de tratamiento ilícito.
                    Acceso y Rectificación: Disponemos de medios para que acceda o rectifique sus datos cuando lo considere oportuno.
                    Conservación: Conservamos sus datos personales de manera legal y apropiada y solo mientras es necesario para los fines para los que se han recopilado.
                    Las transferencias internacionales: cuando se dé el caso de que sus datos vayan a ser transferidos fuera de la UE/EEE se protegerán adecuadamente.
                    Terceros: El acceso y transferencia de datos personales a terceros se llevan a cabo de acuerdo con las leyes y reglamentos aplicables y con las garantías contractuales adecuadas.
                    Marketing Directo y cookies: Cumplimos con la legislación aplicable en materia de publicidad y cookies.
                <br/>
                <br/>
                - 3. RECOGIDA Y TRATAMIENTO DE SUS DATOS PERSONALES
                <br/>
                <br/>
                Las tipos de datos que se pueden solicitar y tratar son:

                    Datos de carácter identificativo.

                También recogemos de forma automática datos sobre su visita a nuestro sitio web  según se describe en la política de cookies.

                Siempre que solicitemos sus Datos personales, le informaremos con claridad de qué datos personales recogemos y con qué fin. En general, recogemos y tratamos sus datos personales con el propósito de:

                    Proporcionar información, servicios, productos, información relevante y novedades en el sector.
                    Envío de comunicaciones.
                <br/>
                <br/>
                - 4. LEGITIMIDAD
                <br/>
                <br/>
                De acuerdo con la normativa de protección de datos aplicable, sus datos personales podrán tratarse siempre que:

                    Nos ha dado su consentimiento a los efectos del tratamiento. Por supuesto podrá retirar su consentimiento en cualquier momento.
                    Por requerimiento legal.
                    Por exisitr un interés legítimo que no se vea menoscabado por sus derechos de privacidad, como por ejemplo el envío de información comercial bien por suscripción a nuestra newsletter o por su condición de cliente.
                    Por se necesaria para la prestación de alguno de nuestros servicios mediante relación contractual entre usted y nosotros.
                <br/>
                <br/>
                - 5. COMUNICACIÓN DE DATOS PERSONALES
                <br/>
                <br/>
                Los datos pueden ser comunicados a empresas relacionadas con Love Connect, S.L. para la prestación de los diversos servicios en calidad de Encargados del Tratamiento. La empresa no realizará ninguna cesión, salvo por obligación legal.
                <br/>
                <br/>
                - 6. SUS DERECHOS
                <br/>
                <br/>
                En relación con la recogida y tratamiento de sus datos personales, puede ponerse en contacto con nosotros en cualquier momento para:

                    Acceder a sus datos personales y a cualquier otra información indicada en el Artículo 15.1 del RGPD.
                    Rectificar sus datos personales que sean inexactos o estén incompletos de acuerdo con el Artículo 16 del RGPD.
                    Suprimir sus datos personales de acuerdo con el Artículo 17 del RGPD.
                    Limitar el tratamiento de sus datos personales de acuerdo con el Artículo 18 del RGPD.
                    Solicitar la portabilidad de sus datos de acuerdo con el Artículo 20 del RGPD.
                    Oponerse al tratamiento de sus datos personales de acuerdo con el artículo 21 del RGPD.

                Si ha otorgado su consentimiento para alguna finalidad concreta, tiene derecho a retirar el consentimiento otorgado en cualquier momento, sin que ello afecte a la licitud del tratamiento basado en el consentimiento previo a su retirada rrhh.

                Puede ejercer estos derechos enviando comunicación, motivada y acreditada, a tuemail@tudominio .com

                También tiene derecho a presentar una reclamación ante la Autoridad de control competente (www.aepd.es) si considera que el tratamiento no se ajusta a la normativa vigente.
                <br/>
                <br/>
                - 7. INFORMACIÓN LEGAL
                <br/>
                <br/>
                Los requisitos de esta Política complementan, y no reemplazan, cualquier otro requisito existente bajo la ley de protección de datos aplicable, que será la que prevalezca en cualquier caso.
                Esta Política está sujeta a revisiones periódicas y la empresa puede modificarla en cualquier momento. Cuando esto ocurra, le avisaremos de cualquier cambio y le pediremos que vuelva a leer la versión más reciente de nuestra Política y que confirme su aceptación.
                </TextWrapper>
              </PrivacyPolicy>
            </DivInput>
          );
        break;
        case "select":
          const options = [];
          element.options.forEach(element2 => {
            console.log(element2);
            options.push(<option value={element2}>{element2}</option>);
          })
          view.push(
            <DivInput>
            <Label valor={element.label}/>
            <Input name={element.name} type={element.type} options={options} noInput>
            </Input>
            </DivInput>
          );
        break;
        case "submit":
          view.push(
           <DivInput>
             <ButtonSubmit name={element.name} value={element.label} onClick ={(e) => { e.preventDefault(); element.fun(); }}>
              {element.label}
             </ButtonSubmit>
           </DivInput>
           );
        break;
        default:
        break;
      }
    });
    return(
      view
    )
  }

  return (
    <DivForm styles={props.styles}name={props.name}>
      <DivHoverWrapper>
        {CreateInpunts()}
      </DivHoverWrapper>
    </DivForm>
  );
};

export default Form;