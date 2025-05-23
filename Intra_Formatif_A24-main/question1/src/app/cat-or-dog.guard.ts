import { inject } from "@angular/core";
import { CanActivateFn, createUrlTreeFromSnapshot } from "@angular/router";
import { UserService } from "./user.service";

export const catOrDogGuard: CanActivateFn = (route, state) => {
  if (inject(UserService).currentUser?.prefercat == false)
    return createUrlTreeFromSnapshot(route, ["/dog"])
  else return true
};
