function removeIndexImmutable(array,removeIndex)
{
    return [
        ...array.slice(0, removeIndex),
        ...array.slice(removeIndex + 1)
    ]
}

const series = ["Ultrasonic","IRR","IRL","ExtraParametr"]
const colors = ["red","blue","green","purple"]

export {removeIndexImmutable,series,colors}