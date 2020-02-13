# JS-Date-Functions
Functions to Augment JavaScript's Date Class

The following functions are used with a Date Class Instance:

## isSummerTime()
- Checks if this Date instance is at Summer Time.
- **Returns** true if the date is at summer Time or false if it's not.

## dayOfYear()
- Checks witch day of the year the Date instance is.
- **Returns** the day of the year (0-365).

## getWeek(bool sSunday=false)
- Checks witch week number the Date is a part of, in the scope of the year.
- **sSunday** - If true the function will consider __Sunday__ as the first day of the week, otherwise __Monday__ will be used.
- **Returns** the week number.

## nextDay(int day)
- Finds the next day where its weekday matches the given.
- **day** - day of the week to find, from 0 (Sunday) to 6 (Saturday).
- **Returns** a Date instance representing the next date with the given day of the week.

## addDays(int days)
- Adds the provided number of days to the date.
- **day** - the number of days to add (can be negative).
- **Returns** a Date instance matching the provided day difference.

## format(String format)
- Returns a formatted string based on the provided string.
- **format** - the format for the outputted date. *Formatting guide below.*
- **Returns** the formatted string.
### Format Guide
The following data formats for each character. *For Example, date.format('Y-m-d H:i:s') would match to something like '2020-02-13 19:20:12' (depending on the Date class instance).* Most of the characters are based on PHP's date function formatting.
#### Day
- **d** - Day of the month with leading zeros - *01 to 31*
- **D** - Three character day of the week representation - *Sun, Mon, Tue,...*
- **j** - Day of the month without leading zeros - *1 to 31*
- **l** (lowercase L) - Full textual representation of the day of the week - *Sunday, Monday, Tuesday,...*
- **N** - Day of the week starting on Monday - *1 (Monday) to 7 (Sunday)*
- **S** - English day suffix - *st, nd, rd or th*
- **w** - Day of the week starting on Sunday - *0 (Sunday) to 6 (Saturday)*
- **z** - Day of the year - *0 (Sunday) to 6 (Saturday)*
#### Week
- **W** - Week number of the Year, starting on Monday
#### Month
- **F** - Full textual representation of the month - *January through December*
- **m** - Month with leading zeros - *01 to 12*
- **M** - Three character month representation - *Jan, Feb, Mar,...*
- **n** - Month without leading zeros - *1 to 12*
- **t** - Week number of the Year, starting on Monday
#### Year
- **L** - Whether the date matches a leap year - *1 (leap year) or 0 (it isn't)*
- **Y** - Full Year - *ex: 1982, 2001, 2020*
- **y** - Two digit representation of the Year - *ex: 82, 01, 20*
#### Time
- **a** - Lowercase Ante meridiem and Post meridiem - *am or pm*
- **A** - Uppercase Ante meridiem and Post meridiem - *AM or PM*
- **g** - 12-hour format of an hour without leading zeros - *1 to 12*
- **G** - 24-hour format of an hour without leading zeros - *0 to 23*
- **h** - 12-hour format of an hour with leading zeros - *01 to 12*
- **H** - 24-hour format of an hour with leading zeros - *00 to 23*
- **i** - Minutes with leading zeros - *00 to 59*
- **s** - Seconds with leading zeros - *00 to 59*
- **v** - Milliseconds
- **U** - Seconds since the Unix Epoch
#### Timezone
- **I** (capital i) - Whether  the date is in daylight saving time - *1 (it's in daylight saving time) or 0 (it isn't)*
- **O** - Difference to Greenwich time (GMT) - *ex: +0200*
- **P** - Difference to Greenwich time (GMT) with hours and minutes split by a colon - *ex: +02:00*
