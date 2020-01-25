let Target = {
    coordinates: (x, y, targetX, targetY, targetRadius) => {
        let theta = Math.atan2(targetY - y, targetX - x)
        theta = (theta > 0 ? theta : (2 * Math.PI + theta)) * 360 / (2 * Math.PI)
        theta = theta * Math.PI / 180
        let finalX = x + targetRadius * Math.cos(theta)
        let finalY = y + targetRadius * Math.sin(theta)
        return { x: finalX, y: finalY }
    },

    getTargetVelocity: (x, y, targetX, targetY, bulletSpeed) => {
        let theta = Math.atan2(targetY - y, targetX - x)
        theta = (theta > 0 ? theta : (2 * Math.PI + theta)) * 360 / (2 * Math.PI)
        theta = theta * Math.PI / 180
        return { x: bulletSpeed * Math.cos(theta), y: bulletSpeed * Math.sin(theta) }
    }
}
export default Target
