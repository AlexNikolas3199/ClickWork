
import { DateTime } from 'luxon'
const getDate = (item) => {
    const startTime = DateTime.fromISO(item?.startTime)
    let ifLessTen = false
    let TimeHour = startTime.hour + parseInt(item.duration)
    let TimeDay = startTime.day
    if (TimeHour >= 24) {
        TimeDay = TimeDay + 1
        TimeHour = TimeHour - 24
    }
    // Cheker()
    if (startTime.minute < 10) ifLessTen = true
    return `${startTime.day}.${startTime.month}.${startTime.year} ${startTime.hour}:${
        ifLessTen ? '0' + startTime.minute : startTime.minute
    } - ${TimeDay}.${startTime.month}.${startTime.year} ${TimeHour}:${
        ifLessTen ? '0' + startTime.minute : startTime.minute
    }`
}
export default getDate