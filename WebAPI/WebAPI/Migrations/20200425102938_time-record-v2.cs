using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class timerecordv2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ExecuterId",
                table: "TimeRecords",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TimeRecords_ExecuterId",
                table: "TimeRecords",
                column: "ExecuterId");

            migrationBuilder.AddForeignKey(
                name: "FK_TimeRecords_AspNetUsers_ExecuterId",
                table: "TimeRecords",
                column: "ExecuterId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimeRecords_AspNetUsers_ExecuterId",
                table: "TimeRecords");

            migrationBuilder.DropIndex(
                name: "IX_TimeRecords_ExecuterId",
                table: "TimeRecords");

            migrationBuilder.DropColumn(
                name: "ExecuterId",
                table: "TimeRecords");
        }
    }
}
