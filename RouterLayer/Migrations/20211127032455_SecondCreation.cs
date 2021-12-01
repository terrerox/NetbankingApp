using Microsoft.EntityFrameworkCore.Migrations;

namespace RouterLayer.Migrations
{
    public partial class SecondCreation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Amount",
                table: "AccountActivities",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "AccountActivities");
        }
    }
}
