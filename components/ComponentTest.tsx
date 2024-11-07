export function ComponentTest(listaUsuarios): JSX.Element {
    const listaUsuariosHTML = listaUsuarios.map(nombre => <li>{nombre}</li>);

    return (
        <ul>{listaUsuariosHTML}</ul>
    );
}