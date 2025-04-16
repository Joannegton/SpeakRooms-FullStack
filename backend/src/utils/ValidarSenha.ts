export function validarSenha(password: string): boolean {
    const minimoCaracteres = 8
    const temMaiuscula = /[A-Z]/.test(password)
    const temMinuscula = /[a-z]/.test(password)
    const temNumero = /[0-9]/.test(password)
    const temCaractereEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    return (
        password.length >= minimoCaracteres &&
        temMaiuscula &&
        temMinuscula &&
        temNumero &&
        temCaractereEspecial
    )
}
