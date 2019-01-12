import React from 'react'
import Pict from '../../resources/pict.png';
import {ScrollPanel} from 'primereact/scrollpanel';
import './Lot.css'
class Lot extends React.Component{

    render() {
            return (
                <div style={{ padding: '.5em' }} className={"lot " + this.props.renderType}>
                    <img src={Pict} alt=""/>
                    <div className={"lot-details"}>

                            <table>
                                <tbody className={"fonts"}>
                                <tr>
                                    <td>
                                        Name:
                                    </td>
                                    <td className={'val'}>
                                        Artifex аrmifer digitis
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Author:
                                    </td>
                                    <td className={'val'}>
                                        Author_NAME
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Exp Date:
                                    </td>
                                    <td className={'val'}>
                                        {(new Date()).toDateString()}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        <hr/>
                        <ScrollPanel className={"description"} style={{width: '100%', height: '80px', margin: 0}}>
                            Artifex аrmifer digitis dextris oculis occultis!Oh great Machine God, we beseech thee to deliver us from danger
                            Oh great Machine God, we beseech thee to bring life into the inanimate
                            Oh great Machine God, we beseech thee to invest this metal carcass with your spirit
                            Oh great Machine God, we beseech thee to bring forth the holy en-djinnMay your weapon be guarded against malfunction.
                            As your soul is guarded from impurity.
                            The Machine God watches over you.
                            Unleash the weapons of war.
                            Unleash the Deathdealer.Toll the Great Bell once!
                            Pull the Lever forward to engage the
                            Piston and Pump…

                        </ScrollPanel>
                    </div>
                </div>
            );


    }

}

export default Lot;

