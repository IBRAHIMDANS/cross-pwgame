export default function getNumber(min: number = 0, max: number = 1337): number {
    return min + Math.round(Math.random() * (max - min));
}
