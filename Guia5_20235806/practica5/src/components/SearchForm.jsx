import { useState, useEffect } from "react";
import { useAppStore } from "../store/useAppStore";

export default function SearchForm() {
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    });

    const handleChange = (e) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        });
    };

    // Obtener funciones del store
    const fetchCategories = useAppStore((state) => state.fetchCategories);
    const categories = useAppStore((state) => state.categories);
    const searchRecipes = useAppStore((state) => state.searchRecipes);
    const setNotification = useAppStore((state) => state.setNotification);

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación
        if (Object.values(searchFilters).includes('')) {
            setNotification("Todos los campos son obligatorios", "error"); // Mostrar notificación de error
            return;
        }

        // Consultar las recetas con los filtros
        searchRecipes(searchFilters);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='md:w-1/2 2xl:w-1/3 bg-orange-400 my-16 p-10 rounded-lg shadow space-y-6'
        >
            <div className='space-y-4'>
                <label
                    htmlFor="ingredient"
                    className='block text-white uppercase font-extrabold text-lg'
                >
                    Nombre o Ingredientes
                </label>
                <input
                    id='ingredient'
                    type='text'
                    name='ingredient'
                    value={searchFilters.ingredient}
                    onChange={handleChange}
                    className='p-3 w-full rounded-lg focus:outline-none bg-white'
                    placeholder='Nombre o Ingrediente. Ej. Vodka, Tequila, Café'
                />
            </div>
            <div className='space-y-4'>
                <label
                    htmlFor="category"
                    className='block text-white uppercase font-extrabold text-lg'
                >
                    Categoría
                </label>

                <select
                    id='category'
                    name='category'
                    value={searchFilters.category}
                    onChange={handleChange}
                    className='p-3 w-full rounded-lg focus:outline-none bg-white'
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map(category => (
                        <option value={category.strCategory} key={category.strCategory}>
                            {category.strCategory}
                        </option>
                    ))}
                </select>
            </div>
            <input
                type='submit'
                value='Buscar Recetas'
                className='cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase'
            />
        </form>
    );
}
