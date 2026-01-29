#llama2

## instalación del entorno y dependecias.

-   revisamos node.js, verificacion node -v
sudo apt update
sudo apt install -y nodejs npm 
npm install bootstrap

- revision de la instalacion

npm -v
node -v

si apt te instala versiones antiguas, install de esta manera:

curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc

nvm install 20
nvm use 20


# creacion de entorno de trabajo
npm create vite@latest llamma2Ux
npm run dev -->run server.

## Arquitectura de carpetas(Arch):

src/
├── app/
│   ├── App.tsx
│   └── router.tsx
│
├── features/
│
├── shared/
│   └── services/
│       └── httpClient.ts
│
└── main.tsx

## patron feature-based + MVVM

cada caso de uso es una carpeta.

features/auth/
features/users/
features/dashboard/

## MVVM read adapt

- controller -> page(View)
- Use Case  -> ViewModel(hook)
- Repository -> Service
- DTP -> types

# responsibilidades.
-   View(Page.tsx)
        solo JSX
        eventos(onclick, onsubmit)
        No logica
-   ViewModel(usexViewModel.ts)
        estado
        llamado a servicos
        vlaidaciones
        logica
-   service(x.service.ts)
        http
        API
        nada de react
    
- Feature Based ejemplo:
        features/auth/
        ├── AuthPage.tsx           ← View (pantalla)
        ├── useAuthViewModel.ts    ← ViewModel (lógica)
        ├── auth.service.ts        ← Service (API / backend)
        ├── auth.types.ts          ← DTOs (opcional)
        └── components/
            └── AuthForm.tsx       ← UI pura

    AuthPage.tsx: pantalla Controller delgado, renderiza componentes, manejo de eventos, llama ViewModel, orquestador nada mas.
                No hace: logica, llamadas http, manejo jwt.

    components/AuthForm.tsx: HTML + eventos.
                No hace: es ques JWT, no back, que pasa al hacer login.

    useAuthViewModel.ts: viewModel en react: un custom hook(useX)
                Equivalente: Use Case/ Applicacion Service.
                recibe datos del formulario, valida, llama al service, maneja respuesta, guarda token.

    auth.service.ts:    repository o/ adapter Http, llamar al back o resolver datos.
                no hace:  no guarda token, no conoce react.
    
     Con MVVM:
        Capa	Responsabilidad
        View	UI
        ViewModel	Lógica
        Service

    JWT: dónde vive y cómo fluye
        Flujo completo
        AuthForm
          ↓
        AuthPage
          ↓
        useAuthViewModel
          ↓
        authService
          ↓
        Backend
        
        
        Respuesta:
        
        JWT
          ↑
        ViewModel lo guarda

## Arquitectura 
feature-Based + MVVM ligero.
