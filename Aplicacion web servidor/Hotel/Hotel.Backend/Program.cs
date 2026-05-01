var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
using EF; // tu DbContext del scaffold
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Servicios base
builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

// Swagger/OpenAPI en desarrollo
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();


// ===============================
// 🧪 TEST DE BASE DE DATOS MYSQL
// ===============================
app.MapGet("/test-db", () =>
{
    try
    {
        using var db = new MiDBContext();

        var count = db.Usuarios.Count();

        return Results.Ok($"✅ Conexión OK. Usuarios en BD: {count}");
    }
    catch (Exception ex)
    {
        return Results.BadRequest($"❌ Error de conexión: {ex.Message}");
    }
});


// ===============================
// 🧪 TEST EXTRA: LISTAR USUARIOS
// ===============================
app.MapGet("/usuarios", () =>
{
    using var db = new MiDBContext();

    var usuarios = db.Usuarios
        .Select(u => new
        {
            u.Id,
            u.Nombre,
            u.Email,
            u.Activo
        })
        .ToList();

    return Results.Ok(usuarios);
});

app.Run();
