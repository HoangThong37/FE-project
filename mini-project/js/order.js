var urlOrder = "http://10.63.161.172:3000/api/get-order";

var tableBody = document.getElementById("table-body");
var total = document.getElementById("total-price");

const showOrderDetails = async () => {
  var orderId = getQueryVariable("orderId"); // return order id.

  const response = await fetch(urlOrder, {
    method: "POST",
    body: JSON.stringify({
      page: 0,
      size: 2,
      data: {
        orderId: orderId,
      },
    }),
  });

  const { items } = (await response.json()).data;

  let totalItem = 0;
  for (const item of items[0].products) {
    totalItem += item.price * item.quantity;
  }

  const textData = items[0].products
    .map(
      (item) => `<tr key=${item.productId}>
                        <th scope="row">
                            ${item.name}
                        </th>
                        <td>
                            ${item.quantity}
                        </td>
                        <td>
                            ${(item.quantity * item.price).toLocaleString(
                              "it-IT",
                              {
                                style: "currency",
                                currency: "VND",
                              }
                            )}
                        </td>
                    </tr>`
    )
    .join("");

  console.log("..... ", totalItem.toLocaleString());

  total.innerHTML = `Total: ${totalItem.toLocaleString()} VND`;
  tableBody.innerHTML = textData;
};

function getQueryVariable(variable) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(variable);
}

showOrderDetails();
