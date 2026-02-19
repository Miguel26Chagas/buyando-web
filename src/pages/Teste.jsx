export const Teste = () => {
    return(
        <div>
            <form className="flex flex-col justify-center items-center">
                <div className="flex w-[70%] overflow-hidden justify-between items-center ">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="" id="name" placeholder="digite seu nome" 
                           className="border border-sky-400 p-1 m-2 rounded-lg pl-2" />
                </div>
                <div className="flex w-[70%] overflow-hidden justify-between items-center ">
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" id="password" placeholder="Sua Senha" 
                           className="border border-sky-400 p-1 m-2 rounded-lg pl-2" />
                </div>
                <div>
                    <input type="submit" name="" id="" value={'Entrar'} />
                </div>
            </form>
        </div>
    )
}