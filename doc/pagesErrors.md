1. **Crear Páginas de Error Personalizadas**

Primero, crea archivos específicos para cada tipo de error en el directorio `resources/js/Pages/Errors`. Por ejemplo:

#### Estructura del Directorio:

```
resources/
└── js/
    └── Pages/
        └── Errors/
            ├── NotFound.tsx     // Para errores 404
            ├── MethodNotAllowed.tsx // Para errores 405
            ├── ServerError.tsx  // Para errores 500
            └── GenericError.tsx // Para otros errores
```

#### Ejemplo: `NotFound.tsx` (404)

```tsx
import React from 'react';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="mt-4 text-xl text-gray-600">Página no encontrada</p>
                <p className="mt-2 text-gray-500">
                    Lo sentimos, la página que estás buscando no existe.
                </p>
            </div>
        </div>
    );
};

export default NotFound;
```

#### Ejemplo: `ServerError.tsx` (500)

```tsx
import React from 'react';

const ServerError = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-600">500</h1>
                <p className="mt-4 text-xl text-gray-600">Error del servidor</p>
                <p className="mt-2 text-gray-500">
                    Ocurrió un error inesperado. Por favor, intenta nuevamente más tarde.
                </p>
            </div>
        </div>
    );
};

export default ServerError;
```

---

### 2. **Configurar el Middleware de Excepciones**

En Laravel, el archivo `app/Exceptions/Handler.php` maneja cómo se procesan las excepciones. Aquí es donde puedes configurar qué páginas de error mostrar dependiendo del código HTTP.

#### Modificar el Método `render`

Edita el método `render` en `Handler.php` para usar Inertia para renderizar las páginas de error personalizadas.

```php
use Illuminate\Http\Request;
use Inertia\Inertia;

public function render($request, \Throwable $exception)
{
    // Verifica si la solicitud utiliza Inertia
    if ($request->expectsJson() || $request->is('api/*')) {
        return parent::render($request, $exception);
    }

    // Manejar errores específicos
    $status = method_exists($exception, 'getStatusCode') ? $exception->getStatusCode() : 500;

    switch ($status) {
        case 404:
            return Inertia::render('Errors/NotFound');
        case 405:
            return Inertia::render('Errors/MethodNotAllowed');
        case 500:
            return Inertia::render('Errors/ServerError');
        default:
            return Inertia::render('Errors/GenericError', ['status' => $status]);
    }
}
```

**Explicación:**

- El middleware verifica si la solicitud espera una respuesta JSON o pertenece a una API. Si es así, deja que Laravel maneje el error como de costumbre.
- Para solicitudes web, usa `Inertia::render()` para cargar la página de error correspondiente.

---

### 3. **Registrar las Rutas de Error**

Asegúrate de que Laravel pueda manejar correctamente las rutas inexistentes (errores 404). Esto se hace registrando una ruta "fallback" en `routes/web.php`.

#### Agregar la Ruta Fallback

```php
use Illuminate\Support\Facades\Route;

Route::fallback(function () {
    return response()->view('errors.404', [], 404);
});
```

Sin embargo, dado que estás usando Inertia, puedes omitir esta ruta fallback y dejar que el middleware de excepciones maneje los errores.

---

### 4. **Probar las Páginas de Error**

Para probar las páginas de error, puedes simular diferentes códigos HTTP desde tu controlador o directamente en el navegador.

#### Simular un Error 404

Crea una ruta temporal en `routes/web.php`:

```php
Route::get('/test-404', function () {
    abort(404);
});
```

Visita `/test-404` en tu navegador y verifica que se muestre la página de error personalizada.

#### Simular un Error 500

```php
Route::get('/test-500', function () {
    abort(500);
});
```

---

### 5. **Personalización Adicional**

Si deseas pasar datos adicionales a las páginas de error, puedes hacerlo mediante `Inertia::render()`. Por ejemplo:

```php
return Inertia::render('Errors/GenericError', [
    'status' => $status,
    'message' => $exception->getMessage(),
]);
```

Luego, en tu componente React, accede a estos datos a través de `props`:

```tsx
interface Props {
    status: number;
    message?: string;
}

const GenericError = ({ status, message }: Props) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-600">{status}</h1>
                <p className="mt-4 text-xl text-gray-600">Ocurrió un error</p>
                {message && (
                    <p className="mt-2 text-gray-500">{message}</p>
                )}
            </div>
        </div>
    );
};

export default GenericError;
```

---

### Conclusión

Con estos pasos, habrás implementado páginas de error personalizadas que se integran perfectamente con tu stack de Laravel, React, Inertia.js y TypeScript. Estas páginas proporcionan una experiencia de usuario coherente y profesional, incluso cuando ocurren errores. ¡Espero que esto sea útil para tu proyecto! 😊
