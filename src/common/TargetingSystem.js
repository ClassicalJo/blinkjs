let getSlowRatio = (currentPosition, targetPosition, originPosition) => {
    if (currentPosition === 0 && targetPosition === 0) return 1
    else if (originPosition === 0 && targetPosition === 0) return 1
    else return Math.abs(targetPosition - currentPosition) / Math.abs(targetPosition - originPosition)
}
let getTheta = (x, y, targetX, targetY) => {
    let theta = Math.atan2(targetY - y, targetX - x)
    theta = (theta > 0 ? theta : (2 * Math.PI + theta)) * 360 / (2 * Math.PI)
    return theta * Math.PI / 180
}

let Target = {
    coordinates: (x, y, targetX, targetY, targetRadius) => {
        let theta = getTheta(x, y, targetX, targetY)
        let finalX = x + targetRadius * Math.cos(theta)
        let finalY = y + targetRadius * Math.sin(theta)
        return { x: finalX, y: finalY }
    },

    getTargetVelocity: (x, y, targetX, targetY, bulletSpeed) => {
        let theta = getTheta(x, y, targetX, targetY)
        return { x: bulletSpeed * Math.cos(theta), y: bulletSpeed * Math.sin(theta) }
    },

    getTheta: (x, y, targetX, targetY) => {
        let theta = Math.atan2(targetY - y, targetX - x)
        theta = (theta > 0 ? theta : (2 * Math.PI + theta)) * 360 / (2 * Math.PI)
        return theta * Math.PI / 180
    },

    getTargetDiminishingVelocity: (x, y, targetX, targetY, bulletSpeed, origin) => {
        let theta = getTheta(x, y, targetX, targetY)
        return { x: bulletSpeed * getSlowRatio(x, targetX, origin.x) * Math.cos(theta), y: bulletSpeed * getSlowRatio(y, targetY, origin.y) * Math.sin(theta) }
    },

    orbit: (x, y, satelliteX, satelliteY, radius, speed) => {
        let theta = Math.atan2(satelliteY - y, satelliteX - x)
        theta = (theta > 0 ? theta : (2 * Math.PI + theta)) * 360 / (2 * Math.PI)
        theta += speed
        theta = theta * Math.PI / 180

        let finalX = x + radius * Math.cos(theta)
        let finalY = y + radius * Math.sin(theta)
        return { x: finalX, y: finalY }
    },


}



export default Target
