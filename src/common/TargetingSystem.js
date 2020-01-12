let Target = {
    coordinates: (x, y, targetX, targetY, targetRadius) => {
        let theta = Math.atan2(- y + targetY, -x + targetX)
        theta = (theta > 0 ? theta : (2 * Math.PI + theta)) * 360 / (2 * Math.PI)
        theta = theta * Math.PI / 180
        let finalX = x + targetRadius * Math.cos(theta)
        let finalY = y + targetRadius * Math.sin(theta)
        return { x: finalX, y: finalY }
    },

    homing: (x, y, targetRadius, player) => {
        let theta = Math.atan2(-y + player.body.position.y - player.height / 2, -x + player.body.position.x - player.width / 2)
        theta = (theta > 0 ? theta : (2 * Math.PI + theta)) * 360 / (2 * Math.PI)
        theta = theta * Math.PI / 180
        let finalX = x + targetRadius * Math.cos(theta)
        let finalY = y + targetRadius * Math.sin(theta)
        return { x: finalX, y: finalY }
    }
}
export default Target