using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ROAGI.Web.Migrations
{
    /// <inheritdoc />
    public partial class AddGameRuns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GameRuns",
                columns: table => new
                {
                    run_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    health = table.Column<int>(type: "int", nullable: false),
                    gold = table.Column<int>(type: "int", nullable: false),
                    current_floor = table.Column<int>(type: "int", nullable: false),
                    is_alive = table.Column<bool>(type: "bit", nullable: false),
                    started_at = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GameRuns", x => x.run_id);
                    table.ForeignKey(
                        name: "FK_GameRuns_Users_user_id",
                        column: x => x.user_id,
                        principalTable: "Users",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GameRuns_user_id",
                table: "GameRuns",
                column: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GameRuns");
        }
    }
}
