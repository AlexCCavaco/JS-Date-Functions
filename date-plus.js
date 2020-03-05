let DateVars = {
    weekdays: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    weekday: (weekday,short=false)=>{ if(short) return DateVars.weekdays[weekday].substr(0,3); else return DateVars.weekdays[weekday]; },
    month: (month,short=false)=>{ if(short) return DateVars.months[month].substr(0,3); else return DateVars.months[month]; },
    monthSuffix: (monthday)=>{ if(monthday>=11&&monthday<=13) return 'th'; switch(monthday%10){ case 1: return 'st'; case 2: return 'nd'; case 3: return 'rd'; default: return 'th'; } }
};

Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

Date.prototype.getWeek = function(sSunday=false){
    let target = new Date(this.valueOf());
    let dayNr = (this.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    let firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if(target.getDay()!==4){ target.setMonth(0, (sSunday?0:1) + ((4 - target.getDay()) + 7) % 7); }
    return 1 + Math.ceil((firstThursday - target)/604800000);
};

Date.prototype.getYearWeek = function(sSunday=false){
    let week = this.getWeek(sSunday)-1;
    let year = this.getFullYear();
    if(week===0){ if(this.getMonth()===0){ year--; } week = 52; }
    return year+(('0'+week).slice(-2));
};

Date.prototype.nextDay = function(day){
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + (day+(7-date.getDay())) % 7);
    return date;
};

Date.prototype.isToday = function(){
    let today = new Date();
    return this.getDate()===today.getDate() &&
           this.getMonth()===today.getMonth() &&
           this.getFullYear()===today.getFullYear();
};

Date.prototype.daysDiff = function(date=null){
    if(date===null) date = new Date();
    let date1 = Date.UTC(this.getFullYear(),this.getMonth(),this.getDate());
    let date2 = Date.UTC(date.getFullYear(),date.getMonth(),date.getDate());
    return Math.floor((date1-date2)/(1000*60*60*24));
};

Date.prototype.format = function(format){
    let res = '';
    forAllIn(format.split(""),char=>{
        switch(char){
            /* - Day - */
            case 'd': res += ('0'+this.getDate()).slice(-2); return;
            case 'D': res += DateVars.weekday(this.getDay(),true); return;
            case 'j': res += this.getDate(); return;
            case 'l': res += DateVars.weekday(this.getDay()); return;
            case 'N': let d = this.getDay(); res += (d==0)?7:d; return;
            case 'S': res += DateVars.monthSuffix(this.getDate()); return;
            case 'w': res += this.getDay(); return;
            case 'z': res += this.dayOfYear(); return;
            /* - Week - */
            case 'W': res += ('0'+this.getWeek()).slice(-2); return;
            /* - Month - */
            case 'F': res += DateVars.month(this.getMonth()); return;
            case 'm': res += ('0'+(this.getMonth()+1)).slice(-2); return;
            case 'M': res += DateVars.month(this.getMonth(),true); return;
            case 'n': res += (this.getMonth()+1); return;
            case 't': res += (new Date(this.getFullYear(),this.getMonth()+1,0).getDate()); return;
            /* - Year - */
            case 'L': res += (new Date(this.getFullYear(),2,0).getDate())==29?1:0; return;
            case 'Y': res += this.getFullYear(); return;
            case 'y': res += this.getFullYear().toString().substr(2); return;
            /* - Time - */
            case 'a': res += (this.getHours()>=12?'pm':'am'); return;
            case 'A': res += (this.getHours()>=12?'PM':'AM'); return;
            case 'g': let h1 = this.getHours(); res += (h1>12?h1-12:h1); return;
            case 'G': res += this.getHours(); return;
            case 'h': let h2 = this.getHours(); res += ('0'+(h2>12?h2-12:h2)).slice(-2); return;
            case 'H': res += ('0'+this.getHours()).slice(-2); return;
            case 'i': res += ('0'+this.getMinutes()).slice(-2); return;
            case 's': res += ('0'+this.getSeconds()).slice(-2); return;
            case 'v': res += this.getMilliseconds(); return;
            case 'U': res += this.getTime(); return;
            /* - Timezone - */
            case 'I': res += this.isSummerTime()?1:0; return;
            case 'O': let tz1 = timezoneCalc(this.getTimezoneOffset()); res += (tz1[0]?'-':'+')+('0'+tz1[1]).slice(-2)+('0'+tz1[2]).slice(-2); return;
            case 'P': let tz2 = timezoneCalc(this.getTimezoneOffset()); res += (tz2[0]?'-':'+')+('0'+tz2[1]).slice(-2)+':'+('0'+tz2[2]).slice(-2); return;
            /* -- */
            default: res += char;
        }
    });
    return res;

    function timezoneCalc(offset) {
        let neg = offset<0; offset = Math.abs(offset);
        let hr = offset/60;
        let mn = (offset-Math.floor(offset))*60;
        return [neg,hr,mn];
    }
};

Date.prototype.isSummerTime = function(){
    let jan = new Date(this.getFullYear(), 0, 1);
    let jul = new Date(this.getFullYear(), 6, 1);
    let max =  Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    return this.getTimezoneOffset() < max;
};

Date.prototype.dayOfYear = function(){
    let today = Math.floor((new Date(this.getFullYear(),this.getMonth(),this.getDate())).getTime()/86400000);
    let first = Math.floor((new Date(this.getFullYear(),0,1)).getTime()/86400000);
    return today - first;
};

Date.prototype.getQuarter = function(){
    let m = this.getMonth();
    return Math.ceil((m+1)/3);
};
