import * as signalR from "@microsoft/signalr";

let hubConnection: signalR.HubConnection | any;
export const SignalRService = {
  async startConnection() {
    hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://asp-net-web-api-ym61.onrender.com/pay-hub")
      .build();
    hubConnection
      .start()
      .then(() => console.log("Connection started"))
      .catch((err: any) => console.log(err));
  },
  async paymentResult(updatestatus: any) {
    hubConnection.on("Receive", (res: any) => {
      updatestatus(res);
    });
  },
  registerTransacrionId(id: string) {
    hubConnection.invoke("RegisterTransaction",id);

  },
};
