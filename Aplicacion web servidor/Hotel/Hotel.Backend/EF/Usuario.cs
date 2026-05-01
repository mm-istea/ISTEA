using System;
using System.Collections.Generic;

namespace Hotel.Backend.EF;

public partial class Usuario
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public bool Activo { get; set; }

    public DateTime FechaCreacion { get; set; }

    public virtual ICollection<Role> Rols { get; set; } = new List<Role>();
}
