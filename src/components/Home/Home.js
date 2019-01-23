import React from 'react'
import './Home.css'
import axios from "axios";
import {setAuthorised, setUnAuth} from "../../actions/login";
import {connect} from "react-redux";
import {urlPort} from "../../index";



 class Home extends React.Component{
     constructor(props){
         super(props);
         this.state ={};
     }

     componentWillMount() {
         // let first = false;
         // let second = false;
         // const props = this.props;
         // axios.get(urlPort('/lots/owned'), {withCredentials: true}).then(
         //     res =>{
         //         first = true;
         //     }).catch(err=> {first = false;}).then(
         //     ()=>
         //         axios.get(urlPort('/lots/expert'), {withCredentials: true}).then(
         //         res =>{
         //             second = true;
         //         }).catch(err=> {second =false})
         //             .then(()=>{
         //                 if (first === true || second === true){
         //                     this.props.authOK()
         //                 } else this.props.authFail();
         //             })
         // );

         axios.get(urlPort('/role'), {withCredentials: true}).then(
             res => {
                 this.props.authOK(res.data);

             }).catch(
                 err=>{
                     this.props.authFail();
                 }
         )


     }

     render() {
            return (
                <div className={'home'}>
                    <div className={'parallax'}>
                        <div className={'caption'}>
                    <span className="border">
                        WELCOME
                    </span>
                            {/*<i className="pi pi-angle-double-down"/>*/}
                        </div>
                    </div>
                    <div className={'text-box'}>
                        <h3 style={{textAlign: "center"}}>Аукционный дом</h3>
                        <p>
                            Открыт имперский аукционный дом.
                            Лучшее место, чтобы купить или продать картины.
                            Купить наши лоты, вы можете выиграв торги за них.
                            Продумайте стратегию ставок и приобретите картину, о которой вы так давно мечтали.
                            Начинайте зарабатывать вместе с нами!
                        </p>
                    </div>
                    <div className={'parallax vangog'}>
                        <div className={'caption'}>

                    <span className="border">
                        Правила
                    </span>
                            {/*<i className="pi pi-angle-double-down"/>*/}
                        </div>
                    </div>

                    <div className={'text-box'}>
                        <h3 style={{textAlign: "center"}}>Parallax Demo</h3>
                        <p>Правил в нашем аукционном доме немного, но все их необходимо соблюдать.
                            Лот достается пользователю, сделавшему последнюю ставку на момент истечения торгов.
                            Новая ставка на лот должна быть выше текущей.
                            Чтобы сделать ставку необходимо иметь достаточно денег на кошельке.
                            Делать ставки на собственные лоты - запрещено.
                            Необходимо, чтобы картина имела сертификат подлинности, чтобы выставить ее на торг.
                            Пользователи могут быть забанены администрацией за нарушение правил или мошенничество.
                            Все спорные ситуации решаются администрацией
                            почта для вопросов: courseworknotification@gmail.com</p>
                    </div>

                    <div className={'parallax pict2'}>
                        <div className={'caption'}>

                    <span className="border">
                        Phrase 2
                    </span>
                            {/*<i className="pi pi-angle-double-down"/>*/}
                        </div>
                    </div>

                    <div className={'text-box'}>
                        <h3 style={{textAlign: "center"}}>Parallax Demo</h3>
                        <p>Мы рады приветствовать вас в аншем аукционном доме! Аукционный дом «Imperial» основан в 2018-м
                            году и включает в себя галерею живописи, исследовательское и издательское подразделения,
                            дизайн-студию, оформительскую мастерскую.
                            Аукцион живописи предоставляет возможность каждому ценителю искусства приобрести картины русских
                            и западноевропейских художников XVIII, XIX, XX века. Наш Аукционный дом – это известное всем арт
                            дилерам и любителям старины и редкостей место, на котором встречаются желающие продать и
                            желающие купить произведения искусств: живопись, графику и предметы декоративно-прикладного
                            искусства.

                            Спрос и предложение находятся в динамическом равновесии, формируя инвестиционную ценность
                            искусства. Наша аукционная площадка становится точкой встречи, где нынешние и будущие владельцы
                            художественных ценностей могут безопасно заключить сделку купли-продажи.

                            Возможно, вы продаёте или покупаете вещь с художественной ценностью впервые? Мы постарались
                            сделать любой процесс для вас максимально комфортным. Убедитесь, что купить или продать
                            живопись, графику, скульптуру через «Имперский Аукционный дом» – удобно, просто и выгодно.</p>
                    </div>

                    <div className={'parallax end'}/>
                </div>
            );
        }
 }

function mapDispatchToProps(dispatch){
    return {
        authOK: (role)=>dispatch(setAuthorised(role)),
        authFail: () => dispatch(setUnAuth())
    }
}

export default connect(null, mapDispatchToProps)(Home);