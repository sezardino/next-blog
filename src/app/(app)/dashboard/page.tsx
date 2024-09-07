import { Button } from "@/components/ui/button";

const AppDashboardPage = () => {
  return (
    <>
      <h1>Dashboard</h1>

      <div>
        <h2>default</h2>
        <div>
          <Button color={"primary"}>primary</Button>
          <Button color={"secondary"}>secondary</Button>
          <Button color={"destructive"}>destructive</Button>
          <Button color={"info"}>info</Button>
          <Button color={"success"}>success</Button>
          <Button color={"warning"}>warning</Button>
        </div>
      </div>
      <div>
        <h2>ghost</h2>
        <div>
          <Button variant={"ghost"} color={"primary"}>
            primary
          </Button>
          <Button variant={"ghost"} color={"secondary"}>
            secondary
          </Button>
          <Button variant={"ghost"} color={"destructive"}>
            destructive
          </Button>
          <Button variant={"ghost"} color={"info"}>
            info
          </Button>
          <Button variant={"ghost"} color={"success"}>
            success
          </Button>
          <Button variant={"ghost"} color={"warning"}>
            warning
          </Button>
        </div>
      </div>
      <div>
        <h2>outline</h2>
        <div>
          <Button variant={"outline"} color={"primary"}>
            primary
          </Button>
          <Button variant={"outline"} color={"secondary"}>
            secondary
          </Button>
          <Button variant={"outline"} color={"destructive"}>
            destructive
          </Button>
          <Button variant={"outline"} color={"info"}>
            info
          </Button>
          <Button variant={"outline"} color={"success"}>
            success
          </Button>
          <Button variant={"outline"} color={"warning"}>
            warning
          </Button>
        </div>
      </div>
      <div>
        <h2>link</h2>
        <div>
          <Button variant={"link"} color={"primary"}>
            primary
          </Button>
          <Button variant={"link"} color={"secondary"}>
            secondary
          </Button>
          <Button variant={"link"} color={"destructive"}>
            destructive
          </Button>
          <Button variant={"link"} color={"info"}>
            info
          </Button>
          <Button variant={"link"} color={"success"}>
            success
          </Button>
          <Button variant={"link"} color={"warning"}>
            warning
          </Button>
        </div>
      </div>
    </>
  );
};

export default AppDashboardPage;
