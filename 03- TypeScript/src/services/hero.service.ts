import {husb} from '../data/husb'; 

export const findHusbBy = (id: number) =>{
    return husb.find((husb) => husb.id === id);
}