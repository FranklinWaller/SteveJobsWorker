export default function sleep(amount) {
    return new Promise((resolve) => {
        setTimeout(resolve, amount);
    });
}
