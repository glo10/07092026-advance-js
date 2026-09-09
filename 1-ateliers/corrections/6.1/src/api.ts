import { UserData, GitHubUser, ApiResponse } from '../interfaces'
export function fetchUserData(userId: number): Promise<UserData> {
  return new Promise<UserData>((resolve, reject) => {
    setTimeout(() => { // setTimeout à supprimer en prod, ici uniquement pour simuler le trafic réseau
      if (userId % 2 === 0) {
        resolve({ id: userId, isIdEven: true });
      } else {
        reject(new Error(`${userId} is odd`));
      }
    }, 100);
  });
}

export async function findUsers(url: string = 'https://api.github.com/users'): Promise<GitHubUser[] | Error> {
  return fetch(url)
    .then((res: Response) => res.json())
    .then((users: GitHubUser[]) =>
      users.map(({ id, login, url }) => ({ id, login, url }))
    )
    .catch((error: Error) => error);
}

export function GenericApiResponse<T>(data: T): ApiResponse<T> {
  return {
    status: "success",
    data: data
  };
}