export default function HeadingSmall({ title, description }: { title: string; description?: string }) {
    return (
        <header>
            <h3 className="mb-0.5 font-medium text-gray-400 dark:text-white">{title}</h3>
            {description && <p className="dark:text-muted-foreground text-sm font-semibold text-white">{description}.</p>}
        </header>
    );
}
