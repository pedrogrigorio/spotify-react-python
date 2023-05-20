export default function convertDate(date) {

    if(!date){
      return
    }

    const [year, month, day] = date.split('-')

    var month_str = ''
    switch (month) {
        case '01':
            month_str = 'jan.';
            break;
        case '02':
            month_str = 'fev.';
            break;
        case '03':
            month_str = 'mar.';
            break;
        case '04':
            month_str = 'abr.';
            break;  
        case '05':
            month_str = 'maio'; 
            break; 
        case '06':
            month_str = 'jun.';
            break;  
        case '07':
            month_str = 'jul.';
            break;
        case '08':
            month_str = 'ago.';
            break;
        case '09':
            month_str = 'set.';
            break;
        case '10':
            month_str = 'out.'; 
            break; 
        case '11':
            month_str = 'nov.'; 
            break; 
        case '12':
            month_str = 'dez.';
            break;
        default:
            console.log("can't interpret the month")
           
    }

    const message = `${day} de ${month_str} de ${year}`
    
    return message;
}