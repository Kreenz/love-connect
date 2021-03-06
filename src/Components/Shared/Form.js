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
                ??ltima actualizaci??n: Enero 2021.
                <br/>
                <br/>
                - 1. INFORMACI??N AL USUARIO
                <br/>
                <br/>
                Love Connect, S.L., como Responsable del Tratamiento, le informa que, seg??n lo dispuesto en el Reglamento (UE) 2016/679, de 27 de abril, (RGPD) y en la L.O. 3/2018, de 5 de diciembre, de protecci??n de datos y garant??a de los derechos digitales (LOPDGDD), trataremos su datos tal y como reflejamos en la presente Pol??tica de Privacidad.

                En esta Pol??tica de Privacidad describimos c??mo recogemos sus datos personales y por qu?? los recogemos, qu?? hacemos con ellos, con qui??n los compartimos, c??mo los protegemos y sus opciones en cuanto al tratamiento de sus datos personales.

                Esta Pol??tica se aplica al tratamiento de sus datos personales recogidos por la empresa para la prestaci??n de sus servicios. Si acepta las medidas de esta Pol??tica, acepta que tratemos sus datos personales como se define en esta Pol??tica.

                <br/>
                <br/>
                - 2. PRINCIPIOS CLAVE
                <br/>
                <br/>
                Siempre hemos estado comprometidos con prestar nuestros servicios con el m??s alto grado de calidad, lo que incluye tratar sus datos con seguridad y transparencia. Nuestros principios son:

                    Legalidad: Solo recopilaremos sus Datos personales para fines espec??ficos, expl??citos y leg??timos.
                    Minimizaci??n de datos: Limitamos la recogida de datos de car??cter personal a lo que es estrictamente relevante y necesario para los fines para los que se han recopilado.
                    Limitaci??n de la Finalidad: Solo recogeremos sus datos personales para los fines declarados y solo seg??n sus deseos.
                    Precisi??n: Mantendremos sus datos personales exactos y actualizados.
                    Seguridad de los Datos: Aplicamos las medidas t??cnicas y organizativas adecuadas y proporcionales a los riesgos para garantizar que sus datos no sufran da??os, tales como divulgaci??n o acceso no autorizado, la destrucci??n accidental o il??cita o su p??rdida accidental o alteraci??n y cualquier otra forma de tratamiento il??cito.
                    Acceso y Rectificaci??n: Disponemos de medios para que acceda o rectifique sus datos cuando lo considere oportuno.
                    Conservaci??n: Conservamos sus datos personales de manera legal y apropiada y solo mientras es necesario para los fines para los que se han recopilado.
                    Las transferencias internacionales: cuando se d?? el caso de que sus datos vayan a ser transferidos fuera de la UE/EEE se proteger??n adecuadamente.
                    Terceros: El acceso y transferencia de datos personales a terceros se llevan a cabo de acuerdo con las leyes y reglamentos aplicables y con las garant??as contractuales adecuadas.
                    Marketing Directo y cookies: Cumplimos con la legislaci??n aplicable en materia de publicidad y cookies.
                <br/>
                <br/>
                - 3. RECOGIDA Y TRATAMIENTO DE SUS DATOS PERSONALES
                <br/>
                <br/>
                Las tipos de datos que se pueden solicitar y tratar son:

                    Datos de car??cter identificativo.

                Tambi??n recogemos de forma autom??tica datos sobre su visita a nuestro sitio web  seg??n se describe en la pol??tica de cookies.

                Siempre que solicitemos sus Datos personales, le informaremos con claridad de qu?? datos personales recogemos y con qu?? fin. En general, recogemos y tratamos sus datos personales con el prop??sito de:

                    Proporcionar informaci??n, servicios, productos, informaci??n relevante y novedades en el sector.
                    Env??o de comunicaciones.
                <br/>
                <br/>
                - 4. LEGITIMIDAD
                <br/>
                <br/>
                De acuerdo con la normativa de protecci??n de datos aplicable, sus datos personales podr??n tratarse siempre que:

                    Nos ha dado su consentimiento a los efectos del tratamiento. Por supuesto podr?? retirar su consentimiento en cualquier momento.
                    Por requerimiento legal.
                    Por exisitr un inter??s leg??timo que no se vea menoscabado por sus derechos de privacidad, como por ejemplo el env??o de informaci??n comercial bien por suscripci??n a nuestra newsletter o por su condici??n de cliente.
                    Por se necesaria para la prestaci??n de alguno de nuestros servicios mediante relaci??n contractual entre usted y nosotros.
                <br/>
                <br/>
                - 5. COMUNICACI??N DE DATOS PERSONALES
                <br/>
                <br/>
                Los datos pueden ser comunicados a empresas relacionadas con Love Connect, S.L. para la prestaci??n de los diversos servicios en calidad de Encargados del Tratamiento. La empresa no realizar?? ninguna cesi??n, salvo por obligaci??n legal.
                <br/>
                <br/>
                - 6. SUS DERECHOS
                <br/>
                <br/>
                En relaci??n con la recogida y tratamiento de sus datos personales, puede ponerse en contacto con nosotros en cualquier momento para:

                    Acceder a sus datos personales y a cualquier otra informaci??n indicada en el Art??culo 15.1 del RGPD.
                    Rectificar sus datos personales que sean inexactos o est??n incompletos de acuerdo con el Art??culo 16 del RGPD.
                    Suprimir sus datos personales de acuerdo con el Art??culo 17 del RGPD.
                    Limitar el tratamiento de sus datos personales de acuerdo con el Art??culo 18 del RGPD.
                    Solicitar la portabilidad de sus datos de acuerdo con el Art??culo 20 del RGPD.
                    Oponerse al tratamiento de sus datos personales de acuerdo con el art??culo 21 del RGPD.

                Si ha otorgado su consentimiento para alguna finalidad concreta, tiene derecho a retirar el consentimiento otorgado en cualquier momento, sin que ello afecte a la licitud del tratamiento basado en el consentimiento previo a su retirada rrhh.

                Puede ejercer estos derechos enviando comunicaci??n, motivada y acreditada, a tuemail@tudominio .com

                Tambi??n tiene derecho a presentar una reclamaci??n ante la Autoridad de control competente (www.aepd.es) si considera que el tratamiento no se ajusta a la normativa vigente.
                <br/>
                <br/>
                - 7. INFORMACI??N LEGAL
                <br/>
                <br/>
                Los requisitos de esta Pol??tica complementan, y no reemplazan, cualquier otro requisito existente bajo la ley de protecci??n de datos aplicable, que ser?? la que prevalezca en cualquier caso.
                Esta Pol??tica est?? sujeta a revisiones peri??dicas y la empresa puede modificarla en cualquier momento. Cuando esto ocurra, le avisaremos de cualquier cambio y le pediremos que vuelva a leer la versi??n m??s reciente de nuestra Pol??tica y que confirme su aceptaci??n.
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